import numpy as np
arr=np.array([1,2,3,4,5])
print(arr.shape)
arr1=np.array([[1,2,3,4,5],[6,7,8,9,10]])
print(arr1.shape)
arr2=np.array([[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]])
print(arr2.shape)
# Reshaping arrays
arr3=np.array([1,2,3,4,5,6,7,8,9,10,11,12])
# Reshape array from 1-D to 2-D
newarr=arr3.reshape(4,3)
print(newarr)
newarr1=arr3.reshape(3,4)
print(newarr1)

# Reshaping from 1-D to 3-D
newarr2=arr3.reshape(2,3,2).base
print(newarr2)

newarr3=arr3.reshape(3,2,2).base
print(newarr3)

# Passing unknown dimensions
arr4=np.array([1,2,3,4,5,6,7,8])
# Reshape array with unknown dimensions
nwarr=arr4.reshape(2,2,-1)
print(nwarr)
nwarr1=arr2.reshape(-1)
print(nwarr1)