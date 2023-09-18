# PCasso

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.



# Running the app

## Via NPM

```bash
## Instal th dependencies
npm install
```


```bash
# Run the project
ng serve
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Via Docker

```bash
docker build -f "Dockerfile" -t p-casso:latest .
docker run -d -it --name p-casso -p 80:80 p-casso:latest
```