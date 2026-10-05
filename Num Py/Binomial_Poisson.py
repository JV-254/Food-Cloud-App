# Difference between binomial and poisson distribution
import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

# Dictionary for elements
data={
    "Binomial": random.binomial(n=1000,p=0.01,size=1000),
    "Poisson":random.poisson(lam=10,size=1000)
}
sns.displot(data,kind='kde')
plt.show()