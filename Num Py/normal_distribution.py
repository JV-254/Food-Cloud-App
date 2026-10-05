import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Generate random data from a normal distribution
data = np.random.normal(loc=0, scale=1, size=1000)

# Create the density plot
sns.kdeplot(data)

# Add title and labels
plt.title("Normal Distribution")
plt.xlabel("Values")
plt.ylabel("Density")

# Display the graph
plt.show()