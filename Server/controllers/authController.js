// Server/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const AfricasTalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});
const sms = AfricasTalking.SMS;

// Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- 1. CORPORATE REGISTRATION (GENERATES & EMAILS CODE) ---
exports.registerCorporateProfile = async (req, res) => {
  try {
    const { fullname, company, email, phone, password, confirmPassword } = req.body;

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must contain at least 6 characters." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email.trim()]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: "An account with this email already exists." });
    }
    
    // 🛡️ Extra check: Ensure phone number isn't duplicated either
    const [existingPhone] = await db.execute('SELECT id FROM users WHERE phone = ?', [phone.trim()]);
    if (existingPhone.length > 0) {
      return res.status(400).json({ success: false, message: "An account with this phone number already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a random 6-digit numerical verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const sql = 'INSERT INTO users (fullname, company, email, phone, password, verification_code, is_verified) VALUES (?, ?, ?, ?, ?, ?, 0)';
    await db.execute(sql, [fullname.trim(), company.trim(), email.trim(), phone.trim(), hashedPassword, verificationCode]);

    // Send the email with the code
    const mailOptions = {
      from: `"FoodCloud Kenya" <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: "Verify Your FoodCloud Corporate Profile",
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #059669;">Welcome to FoodCloud Kenya</h2>
          <p>Hello ${fullname},</p>
          <p>Thank you for registering. Please use the following 6-digit verification code to complete your registration:</p>
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #15803d; margin: 20px 0;">
            ${verificationCode}
          </div>
          <p style="font-size: 11px; color: #64748b;">If you did not sign up for this account, you can ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Tenant provisioned. Please check your email for the verification code."
    });

  } catch (error) {
    console.error("Registration pipeline breakdown:", error);
    return res.status(500).json({ success: false, message: "Internal server infrastructure validation failure." });
  }
};

// --- 2. VERIFICATION GATEWAY ---
exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email.trim()]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "Account profile not found." });
    }

    const user = users[0];

    // Check if the code matches
    if (user.verification_code !== code.trim()) {
      return res.status(400).json({ success: false, message: "Incorrect verification code. Please try again." });
    }

    // Set user as verified and clear code
    await db.execute('UPDATE users SET is_verified = 1, verification_code = NULL WHERE id = ?', [user.id]);

    return res.status(200).json({
      success: true,
      message: "Account verified successfully! You can now log in."
    });

  } catch (error) {
    console.error("Verification gateway failure:", error);
    return res.status(500).json({ success: false, message: "Failed to verify account." });
  }
};

// --- 3. AUTHENTICATION GATEWAY (WITH VERIFICATION ENFORCEMENT) ---
exports.loginWorkspace = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user signature by input indexing parameters
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email.trim()]);
    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No account found. Please create an account first."
      });
    }

    const user = users[0];

    // 🛡️ SECURITY GUARDRAIL: Check if the tenant is verified
    if (user.is_verified === 0) {
      return res.status(403).json({
        success: false,
        message: "Your email address is unverified. Please verify your account first."
      });
    }

    // Decode and verify secure password signatures
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password."
      });
    }

    // Cryptographically sign our new user session payload
    const sessionExpiry = `${process.env.SESSION_TIMEOUT_MINS || 60}m`;
    const token = jwt.sign(
      { 
        id: user.id, 
        fullname: user.fullname, 
        company: user.company, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: sessionExpiry }
    );

    return res.status(200).json({
      success: true,
      message: "Authentication confirmed. Initializing dashboard space.",
      token: token, 
      user: {
        id: user.id,
        fullname: user.fullname,
        company: user.company,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Authentication gateway failure:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal structural pipeline execution failure." 
    });
  }
};

// --- 4. FORGOT PASSWORD: DISPATCH CODE ---
exports.forgotPassword = async (req, res) => {
  try {
    const { method, contact } = req.body;
    const cleanContact = contact.trim();

    const queryStr = method === 'email' 
      ? 'SELECT * FROM users WHERE email = ?' 
      : 'SELECT * FROM users WHERE phone = ?';
      
    const [users] = await db.execute(queryStr, [cleanContact]);
    
    if (users.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: "If the account matches our cluster network, a token has been dispatched." 
      });
    }

    const user = users[0];

    // Generate secure 6-digit verification code & 15-minute expiry window
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await db.execute(
      'UPDATE users SET reset_code = ?, reset_expires = ? WHERE id = ?',
      [resetCode, expiryTime, user.id]
    );

    // Dispatch handling logic
    if (method === 'email') {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'FoodCloud Mega — Security Access Reset Token',
        text: `Your 6-digit access recovery token code is: ${resetCode}. It expires in 15 minutes.`
      };
      console.log(`✉️ [RESET LOG] Token for ${user.email}: ${resetCode}`);
      await transporter.sendMail(mailOptions);
    } else {
      // 📱 LIVE AFRICA'S TALKING SMS INTEGRATION 
      const smsOptions = {
        to: [user.phone], 
        message: `FoodCloud security token: ${resetCode}. Valid for 15 minutes.`
      };
      try {
        const smsResponse = await sms.send(smsOptions);
        console.log(`📱 [SMS DISPATCHED] Telemetry details:`, smsResponse);
      } catch (smsError) {
        console.error("🚨 SMS gateway delivery failed:", smsError);
      }
    }

    // 🛠️ FIXED: Added the missing clean JSON return code blocks
    return res.status(200).json({
      success: true,
      message: `Verification code successfully dispatched via configured ${method} infrastructure.`
    });

  } catch (error) { // 🛠️ FIXED: Added the missing error handling catch structure block
    console.error("Forgot password extraction pipeline fault:", error);
    return res.status(500).json({ success: false, message: "Internal server validation gateway failure." });
  }
};

// --- 5. FORGOT PASSWORD: VERIFY OTP TOKEN ---
exports.verifyResetCode = async (req, res) => {
  try {
    const { contact, code } = req.body;
    const cleanContact = contact.trim();

    const [users] = await db.execute(
      'SELECT * FROM users WHERE (email = ? OR phone = ?) AND reset_code = ?',
      [cleanContact, cleanContact, code.trim()]
    );

    if (users.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid verification token credentials match." });
    }

    const user = users[0];

    if (new Date() > new Date(user.reset_expires)) {
      return res.status(400).json({ success: false, message: "Token lifespan window has expired. Please request a new token." });
    }

    return res.status(200).json({
      success: true,
      message: "Token signature authorized. Transitioning client to cipher rewrite terminal."
    });

  } catch (error) {
    console.error("Token authentication pipeline error:", error);
    return res.status(500).json({ success: false, message: "Internal validation layer processing timeout." });
  }
};

// --- 6. FORGOT PASSWORD: WRITE NEW PASSWORD ---
exports.resetPassword = async (req, res) => {
  try {
    const { contact, newPassword } = req.body;
    const cleanContact = contact.trim();

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const [result] = await db.execute(
      'UPDATE users SET password = ?, reset_code = NULL, reset_expires = NULL WHERE email = ? OR phone = ?',
      [hashedPassword, cleanContact, cleanContact]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: "System pipeline state mismatch. Account index lost." });
    }

    return res.status(200).json({
      success: true,
      message: "Target user account cipher updated successfully. Access authorization updated."
    });

  } catch (error) {
    console.error("Database cipher commit error:", error);
    return res.status(500).json({ success: false, message: "Failed to persist updated security credentials configuration." });
  }
};