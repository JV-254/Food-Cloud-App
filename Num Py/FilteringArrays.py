import numpy as np
arr=np.array([41,42,43,44])
filter_arr=[]
for element in arr:
    if element>42:
        filter_arr.append(True)
    else:
        filter_arr.append(False)
newarr=arr[filter_arr]
print(filter_arr)
print(newarr)

# An array to filter out even numbers
arr1=np.array([1,2,3,4,5,6,7,8,9,10])
filter_Even=[]
for num in arr1:
    if num %2==0:
        filter_Even.append(True)
    else: 
        filter_Even.append(False)
newarr1=arr1[filter_Even]
print(newarr1)