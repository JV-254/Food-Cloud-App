#mRayleigh Distribution
import numpy as np
from numpy import random
x=random.rayleigh(scale=2,size=(2,3))
print(x)

# Visualization of Rayleigh distribution
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Rayleigh": random.rayleigh(scale=2, size=1000)
}
sns.displot(data,kind='kde')
plt.show()