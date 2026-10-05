import numpy as np
arr=np.array([[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]])
print(arr)
print(arr.ndim)
# Accessing the element 6
print(arr[0,1,2])
print(arr[1,1,1])
print(arr[1,0,1])
print(arr[0,0,1])

# Negative indexing
arr2=np.array([[1,2,3,4,5,6],[7,8,9,10,11,12]])
print("Last element from 2nd dimension: ",arr2[1,-1])
print("Last element from first dimension: ",arr2[0,-1])