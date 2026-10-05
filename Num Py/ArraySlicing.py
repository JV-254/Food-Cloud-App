import numpy as np
arr=np.array([1,2,3,4,5,6])
print(arr[2:5])
# Accessing array from index 2 to the end
print(arr[2:])
# Accessing array from index 0-4
print(arr[:4])
# Negative slicing
arr2=np.array([1,2,3,4,5,6,7])
print(arr2[-3:-1])
print(arr2[-5:-2])

# Array slicing for 2-D arrays
arr3=np.array([[1,2,3,4,5],[6,7,8,9,10]])
print(arr3[1,2:5])
print(arr3[0,1:4])
# From both elements return index 2
print(arr3[0:2,2])
print(arr3[0:2,3])
print(arr3[0:2,1:4])

# Identifying the data type of an array
print(arr3.dtype)