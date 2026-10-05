import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns
sns.displot(random.normal(loc=2,scale=1.5,size=50),kind='kde')
plt.show()