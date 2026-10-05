import numpy as np
arr1=np.array([1,2,3,4,5])
arr2=np.array([6,7,8,9,10])
nwarr=np.concatenate((arr1,arr2))
print(nwarr)

# Concatenating 2-D arrays
x=np.array([[1,2,3,4],[5,6,7,8]])
y=np.array([[10,11,12,13],[14,15,16,17]])
z=np.dstack((x,y))
print(z)