import numpy as np
arr1=np.array([1,2,3,4,5,6])
newarr=np.array_split(arr1,3)
newarr1=np.array_split(arr1,4)
print(newarr)
print(newarr1)
print(newarr1[1])
print(newarr[2])

# Splitting 2-D arrays
arr2=np.array([[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]])
newarr3=np.array_split(arr2,3)
print(newarr3)