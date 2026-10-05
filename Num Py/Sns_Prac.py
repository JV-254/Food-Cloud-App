import matplotlib.pyplot as plt
import seaborn as sns
sns.displot([0,1,2,3,4,5,6,7,8])
plt.show()

# Plotting it as a curve
sns.displot([0,1,2,3,4,5,6,7,8], kind='kde')
plt.show()