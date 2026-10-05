# Uniform Distribution
import numpy as np
from numpy import random
x=random.uniform(size=(2,3))
print(x)

# Visualization of uniform distribution
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Uniform": random.uniform(size=1000)
}
sns.displot(data,kind='kde')
plt.show()