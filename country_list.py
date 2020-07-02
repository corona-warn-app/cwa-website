def print_list(countries):
    list_items = "".join(["<li>" + country.replace("\n", "") + "</li>" for country in sorted(countries)])
    print("<ul>" + list_items + "</ul>")

f = open("src/data/app_store_countries.txt")
countries = f.readlines()
print_list(countries)
print("+++")
f = open("src/data/app_store_countries.de.txt")
countries = f.readlines()
print_list(countries)
