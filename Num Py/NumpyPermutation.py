import numpy as np
from numpy import random
arr=np.array([1,2,3,4,5,6,7])
random.shuffle(arr)
print(arr)

# Using permutation method
random.permutation(arr)
print(arr)