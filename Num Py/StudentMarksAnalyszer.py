import numpy as np
marks=np.array([69,89,45,90,76,58,82,94,61,73])
# Finding highest mark
highest=np.max(marks)
print(highest)
# Finding the lowest marks
lowest=np.min(marks)
print(lowest)
# Finding the average marks
average=np.average(marks)
print(average)
# Count of students who scored above 70
count=np.sum(marks>70)
print(count)
# Students who failed
fail=np.sum(marks<50)
print(fail)
# Boolean masking
above_70=marks>70
print(above_70)
below_50=marks<50
print(below_50)

# ----2 . MONTHLY SALES ANALYSIS ---------------------------
print("------- MONTHLY SALES ANALYSIS--------")
sales=np.array([1200,1500,1700,1800,2100,2300,2200,2500,2600,2800,3000,3500])
# Total Anaual Sales
total_Sales=np.sum(sales)
print(f"Total Sales: {total_Sales}")
# Average Monthly Sales
average_sales=np.average(sales)
print(f"Average Monthly Sales: {average_sales}")
# Best Month sales
best_Month=np.max(sales)
print(f"Best Month Sales: {best_Month}")
# Worst Month Sales
worst_Month=np.min(sales)
print(f"Worst Month Sales: {worst_Month}")
# Month with sales above average
sales_above_Average=np.sum(sales>average_sales)
print(f"Month with sales above average: {sales_above_Average}")

# WEATHER TEMPERATURE TRACKER
print("------ WEATHER TEMPERATURE TRACKER----------")
temps=np.array([23,25,21,27,30,28,24])
# HIGHEST TEMPARATURE
highest_temp=np.max(temps)
print(f"Highest Temparature: {highest_temp}")
# LOWEST TEMPERATURE
lowest_temp=np.min(temps)
print(f"Lowest Temparature: {lowest_temp}")
# Average Temparature
avg_temp=np.average(temps)
print(f"Average Temparature: {avg_temp}")
# Days Hotter than the average
days_Hotter_than_Average=np.sum(temps>avg_temp)
print(f"Days Hotter Than The Average: {days_Hotter_than_Average}")
# Temperature Range
temp_range=max(temps)-min(temps)
print(f"Temparature Range: {temp_range}")

print("------ EMPLOYEE SALARY ANALYSIS---------")
salaries=np.array([45000,50000,55000,60000,65000,70000,75000,80000])
# Increase Salaries by 10%
new_Salaries=salaries*1.10
print(F"Increased Salaries: {new_Salaries}")
# Average Salary
avg_Salary=np.average(new_Salaries)
print(f"Average Salaries: {avg_Salary}")
# Employee earning above the average
Employee_Above_Average=np.sum(new_Salaries>avg_Salary)
print(f"Employee Earning above the average: {Employee_Above_Average}")
# Sorting Salaries
Sorted_Salary=np.sort(new_Salaries)
print(f"Sorted Salaries: {Sorted_Salary}")

print("-------- EXAM RESULTS MATRIX ------------")
scores=np.array([[70,80,90],[60,75,85],[88,92,95],[55,65,70]])
print(scores)