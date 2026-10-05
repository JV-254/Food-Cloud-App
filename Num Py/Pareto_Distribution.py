# Pareto Distribution
import numpy as np
from numpy import random
x=random.pareto(a=2,size=(2,3))
print(x)

# Pareto distribution visualization
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Pareto":random.pareto(a=2,size=1000)
}
sns.displot(data,kind='kde')
plt.show()