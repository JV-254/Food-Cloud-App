import numpy as np
from numpy import random
x=random.choice([2,4,6,7,8],p=[0.2,0.3,0.1,0.0,0.4],size=50)
print(x)

# Random permutation
arr=np.array([23,23,54,65,45])
print(random.permutation(arr))

# Seaborn poltting
import matplotlib.pyplot as plt
import seaborn as sns
sns.displot([2,4,5,6,8],kind='kde')
plt.show()