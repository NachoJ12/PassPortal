FROM quay.io/keycloak/keycloak:21.1.1

# Make the realm configuration available for import
COPY realm.json /opt/keycloak_import/

# Import the realm, client, users and groups
RUN /opt/keycloak/bin/kc.sh import --file /opt/keycloak_import/realm.json

# The Keycloak server is configured to listen on port 8080
EXPOSE 8080
EXPOSE 8443

# Import the realm on start-up
CMD ["start-dev"]
