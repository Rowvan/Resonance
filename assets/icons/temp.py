import os

imports : str = ""
exports : str = "export default {"

for file in os.listdir("./assets/icons"):
    imports += "import " + file.replace(".png", "") + f" from \"../assets/icons/{file.replace('.png', '')}.png\"\n"
    exports += "\t" + file.replace(".png", "") + ",\n"

exports += "\n};"

print(imports)
print(exports)