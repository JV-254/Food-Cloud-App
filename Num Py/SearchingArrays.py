import numpy as np
arr1=np.array([11,2,34,4,23,4,57,4])
# Search for index where there is 4
x=np.where(arr1==4)
print(x)
# Searching for odd numbers
y=np.where(arr1 %2==1)
print(y)
# Searching for even numbers
z=np.where(arr1 %2==0)
print(z)
# Search sorted method
arr2=np.array([6,7,8,9])
a=np.searchsorted(arr2,7, side='right')
print(a)
b=np.searchsorted(arr2,[2,4,11])
print(b)
print(np.sort(arr1))

