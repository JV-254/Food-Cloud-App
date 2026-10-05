# Binomial Distribution Curve
import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns
# Create a dictionary to store values
data={
    "Normal":random.normal(loc=3,scale=2.5,size=50),
    "Binomial": random.binomial(n=10,p=0.5,size=50)
}
sns.displot(data,kind='kde')
plt.show()