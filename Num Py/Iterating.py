import numpy as np
arr=np.array([1,2,3,4,5,6])
#  Iterating in a 1-D array
for x in arr:
    print(x)
    
# 2-D Array
arr1=np.array([[1,2,3,4,5],[6,7,8,9,10]])
for y in arr1:
    print(y)

# printing the actual values
for a in arr1:
    for b in a:
        print(b)

# Iterating through a 3-D array
arr2=np.array([[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]])
for c in arr2:
    for d in c:
        for e in d:
            print(e)
