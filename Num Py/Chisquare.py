# Chi square distribution
import numpy as np
from numpy import random
x=random.chisquare(df=2,size=1000)
print(x)

#  Visualization of chi square
import matplotlib.pyplot as plt
import seaborn as sns
data={
    "Chi Square":random.chisquare(df=1,size=1000)
}
sns.displot(data,kind='kde')
plt.show()