import numpy as np
arr=np.array([1,2,3,4,5])
print(arr)
# Checking the numpy version
print(np.__version__)

# Creating an ndarray object
arr1=np.array((12,34,55,66))
print(arr1)
print(type(arr1))

# 0-D Array
arr2=np.array([42])
print(arr2)

# 1-D Array
arr3=np.array([23,45,66,75,32])
print(arr3)

# 2-D Array
arr4=np.array([[1,2,3,4],[5,6,7,8]])
print(arr4)

# 3-D Array
arr5=np.array([[[1,2,3],[4,5,6]],[[7,8,9],[1,2,3]]])
print(arr5)

# Checking the number of dimensions an array have
a=np.array(42)
b=np.array([1,2,3,4,5])
c=np.array([[1,2,3],[4,5,6]])
d=np.array([[[1,2,3],[4,5,6],[1,2,3],[4,5,6]]])
print(a.ndim)
print(b.ndim)
print(c.ndim)
print(d.ndim)

# Higher dimensions array
arr6=np.array([1,2,3,4], ndmin=5)
print(arr6)
print(f"Number of dimensions: {arr6.ndim}")