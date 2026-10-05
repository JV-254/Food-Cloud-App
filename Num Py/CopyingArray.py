import numpy as np
arr=np.array([1,2,3,4,5,6,7])
x=arr.copy()
arr[0]=42
print(arr)
print(x)
# Viewing an array
y=arr.view()
print(arr)
print(y)

y[1]=31
print(arr)
print(y)

# Checking whether an array owns its data
print(x.base)
print(y.base)