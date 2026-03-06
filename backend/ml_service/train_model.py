import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 1. Load the data you provided
df = pd.read_csv('../genetic_disease_dataset.csv') # Path to your CSV

# 2. Prepare Features and Target
X = df.drop('Disease', axis=1)
y = df['Disease']

# 3. Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train the Model
print("Training the brain... please wait.")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Save the "Brain" file
joblib.dump(model, 'compatx_model.pkl')
print("Success! 'compatx_model.pkl' has been created.")