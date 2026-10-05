# Difference between normal and poisson distribution 
import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

data={
    "Normal":random.normal(loc=50,scale=7,size=1000),
    "Poisson":random.poisson(lam=50,size=1000)
}
sns.displot(data,kind='kde')
plt.show()