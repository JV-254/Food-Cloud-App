# Difference between normal and logistic distribution
import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns

data={
    "Normal": random.normal(scale=2,size=1000),
    "Logistic": random.logistic(size=1000)
}

sns.displot(data,kind='kde')
plt.show()