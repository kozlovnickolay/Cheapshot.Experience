#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_15.x | bash \
    && apt-get install nodejs -yq
WORKDIR /app
COPY Cheapshot.Experience.sln ./
COPY Cheapshot.Experience/*.csproj ./Cheapshot.Experience/
COPY Cheapshot.Exprience.Data/*.csproj ./Cheapshot.Exprience.Data/
COPY Cheapshot.Inspector/*.csproj ./Cheapshot.Inspector/

RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:3.1
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_15.x | bash \
    && apt-get install nodejs -yq
WORKDIR /app
EXPOSE 80 433
COPY --from=build-env /app/out .
#ENV ASPNETCORE_URLS=https://+:443;http://+:80
COPY compose/data/*.json /app
ENTRYPOINT ["dotnet", "Cheapshot.Experience.dll"]/