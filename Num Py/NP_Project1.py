# Normal Distribution project
import numpy as np
from numpy import random
scores=np.random.normal(loc=65,scale=15,size=1000)
print(scores)

# Average score 
avg=np.average(scores)
print(f"Average Score: {avg}")
# Highest Score
highest=np.max(scores)
print(f"Highest score: {highest}")
# Lowest score
lowest=np.min(scores)
print(f"Lowest Score: {lowest}")
# Count of students scoring above 80
count=np.sum(scores>80)
print(f"Students above 80: {count}")
# Pass percentage
percentage=count/len(scores)*100
print(f"Pass percentage: {percentage}")

# Students Normal distrubutiion visualization
import matplotlib.pyplot as plt
import seaborn as sns

data={
    "Normal Distribution": random.normal(loc=65,scale=15,size=1000)
}
sns.displot(data,kind='kde')
plt.show()

# COMPANY EMPLOYEES SALARIES
salaries=np.random.normal(loc=50000,scale=10000,size=500)
print(salaries)

# Visualization
data1={
    "Salaries":random.normal(loc=50000,scale=10000,size=500)
}
sns.displot(data1,kind='kde')
plt.show()