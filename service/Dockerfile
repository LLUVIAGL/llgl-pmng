# ============================================
# Etapa 1: Compilación
# ============================================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copiamos primero el pom para aprovechar la caché de Docker
COPY pom.xml .

# Descargamos dependencias
RUN mvn dependency:go-offline -B

# Copiamos el código fuente
COPY src ./src

# Compilamos el proyecto
RUN mvn clean package -DskipTests


# ============================================
# Etapa 2: Ejecución
# ============================================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiamos el JAR generado desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto por defecto de Spring Boot
EXPOSE 8081

# Ejecutamos la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
