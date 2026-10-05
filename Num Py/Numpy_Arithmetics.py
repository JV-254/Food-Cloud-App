import numpy as np
arr1=np.array([10,11,12,13,14,15])
arr2=np.array([20,21,22,23,24,25])
newarr=np.add(arr1,arr2)
print(newarr)
newarr1=np.subtract(arr1,arr2)
print(newarr1)
newarr2=np.multiply(arr1,arr2)
print(newarr2)
newarr3=np.divide(arr1,arr2)
print(newarr3)
newarr4=np.power(arr1,arr2)
print(newarr4)
newarr5=np.remainder(arr1,arr2)
print(newarr5)
# Truncating array
arr3=np.array([-3.16666,3.6667])
narr=np.trunc(arr3)
print(narr)
# Rounding
narr1=np.around(arr3,2)
print(narr1)

# Summation
print(np.sum(arr1))
print(np.prod(arr1))
print(np.diff(arr1))
print(np.lcm.reduce(arr1))
print(np.gcd.reduce(arr1))