# Student Marks Generator
import numpy as np
marks=np.random.randint(0,100,101)
print(marks)
# Average Score
avg=np.average(marks)
print(f"Average Score: {avg}")
# Highest Score
highest=np.max(marks)
print(f"Highest Score: {highest}")
# Lowest Score
lowest=np.min(marks)
print(f"Lowest Score: {lowest}")
# Count of students who scored above 70
count=np.sum(marks>=70)
print(f"Marks above 70: {marks}")
# Pass Percentage
pass_Percentage=(((np.sum(count))/(np.sum(marks)))*100)
print(f"Pass Percentage: {pass_Percentage}")

# 2. Rolls Dice simulator
dice=np.random.randint(1,7,1000)
print(dice)
one=np.sum(dice==1)
print(f"1={one}")
two=np.sum(dice==2)
print(f"2={two}")
three=np.sum(dice==3)
print(f"3= {three}")
four=np.sum(dice==4)
print(f"4= {four}")
five=np.sum(dice==5)
print(f"5= {five}")
six=np.sum(dice==6)
print(f"6= {six}")
seven=np.sum(dice==7)
print(f"7= {seven}")