import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Normal": random.normal(loc=2,scale=3,size=1000),
    "Binormial":random.binomial(n=10,p=0.5,size=1000)
}
sns.displot(data,kind='kde')
plt.show()