# Creating universal functions
import numpy as np
x=np.array([1,2,3,4])
y=np.array([5,6,7,8])
a=np.array([9,10,11,12])

# Create a function
def myadd(x,y,a):
    return x+y+a

# Adding function to universal function
myadd=np.frompyfunc(myadd,3,1)
print(myadd(x,y,a))

# Checking the type of function
print(type(np.add))