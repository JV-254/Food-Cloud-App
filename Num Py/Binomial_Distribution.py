import numpy as np
from numpy import random
x=random.binomial(n=10,p=0.5,size=10)
print(x)

# Visualization of binomial distrivution
import matplotlib.pyplot as plt
import seaborn as sns
sns.displot(random.binomial(n=10,p=0.5,size=10),kind='kde')
plt.show()