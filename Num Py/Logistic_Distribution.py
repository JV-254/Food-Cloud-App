# Logistic Distribution
import numpy as np
from numpy import random
x=random.logistic(loc=1,scale=2,size=(2,3))
print(x)

# Logistic distribution visualization
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Logistic": random.logistic(loc=1,scale=2,size=1000)
}
sns.displot(data,kind='kde')
plt.show()