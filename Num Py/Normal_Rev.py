# Normal Disytribution curve
import numpy as np
from numpy import random
import matplotlib.pyplot as plt
import seaborn as sns
# A dictionary for storage
data={
    "Normal":random.normal(loc=3,scale=2.5,size=50)
}
sns.displot(data,kind='kde')
plt.show()

