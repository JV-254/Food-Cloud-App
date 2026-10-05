import numpy as np 
# Create a 1-D array
arr=np.array([1,2,3,4,5,6])
# Accessing the array
print(arr[2])
# Slicing the array
print(arr[2:5])
# Negative indexing
print(arr[-1])
print(arr[:4])
print(arr[3:])
# Copying an array
x=arr.copy()
print(x)
# Viewing an array
y=arr.view()
print(y)
print(arr)
y[0]=50
print(arr)
print(y)
print(x)
# Creating a 2-D array
arr1=np.array([[1,2,3,4,5],[6,7,8,9,10]])
print(arr1)
# Accessing a 2-D array
print(arr1[1,2])
print("Accessing the 3rd element of first dim: ",arr1[0,3])
# Slicing a 2-D array
print(arr1[0,1:4])
print(arr1[1,2:5])
print(arr1[0:2,2])
# Negative indexing
print(arr1[1,-4:-1])
# Checking if an array owns its data
print(x.base)
print(y.base)