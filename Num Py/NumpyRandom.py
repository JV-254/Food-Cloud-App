import numpy as np
from numpy import random
x=random.randint(100)
print(x)
# Generating a random float
y=random.rand()
print(y)

# Generating a Random array
# 1-D Array
a=random.randint(100,size=(4))
print(a)
# 2-D Array
b=random.randint(100,size=(3,5))
print(b)
#FLOATS
c=random.rand(5,4)
print(c)

d=random.choice([3,5,7,9],size=(2,2))
print(d)

# Creating an array from random probability
e=random.choice([3,5,7,9],p=[0.1,0.3,0.6,0.0],size=(100))
print(e)
# Creating an array from random probability 2-D Array
f=random.choice([3,5,7,9],p=[0.1,0.3,0.4,0.2],size=(3,5))
print(f)