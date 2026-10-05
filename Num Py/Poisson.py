import numpy as np
from numpy import random
x=random.poisson(lam=2,size=10)
print(x)

# Poissson Visualization
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Poisson": random.poisson(lam=2,size=1000)
}
sns.displot(data,  kind='kde')
plt.show()