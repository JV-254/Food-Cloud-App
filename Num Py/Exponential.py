# Exponential Distribution
import numpy as np
from numpy import random
x=np.random.exponential(scale=2,size=1000)
print(x)

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Exponential": random.exponential(scale=2,size=1000)
}
sns.displot(data,kind='kde')
plt.show()