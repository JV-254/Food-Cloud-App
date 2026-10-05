import numpy as np
# Craeting a 0-D array
arr1=np.array(42)
print(arr1)
# Creating a 1-D array
arr2=np.array([1,2,3,4,5])
print(arr2)
# Creating a 2-D array
arr3=np.array([[1,2,3,4,5],[1,2,3,4,5]])
print(arr3)
# Creating a 3-D array
arr4=np.array([[[1,2,3,4,5],[1,2,3,4,5]],[[6,7,8,9,4],[1,2,3,4,5]]])
print(arr4)
# Finding out the number of dimensions in an array
print(arr1.ndim)
print(arr2.ndim)
print(arr3.ndim)
print(arr4.ndim)

# Creating a 20 dimensions array
arr5=np.array([1,2,3,4], ndmin=20)
print(arr5)