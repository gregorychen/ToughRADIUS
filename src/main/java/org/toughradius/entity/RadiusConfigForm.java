package org.toughradius.entity;

public class RadiusConfigForm {

    private String RADIUS_INTERIM_INTELVAL;
    private String RADIUS_MAX_SESSION_TIMEOUT;
    private String RADIUS_TICKET_HISTORY_DAYS;
    private String RADIUS_IGNORE_PASSWORD;
    private String RADIUS_EXPORE_ADDR_POOL;
    private String RADIUS_ONLINE_EXPIRE_CHECK;

    public String getRADIUS_INTERIM_INTELVAL() {
        return RADIUS_INTERIM_INTELVAL;
    }

    public void setRADIUS_INTERIM_INTELVAL(String RADIUS_INTERIM_INTELVAL) {
        this.RADIUS_INTERIM_INTELVAL = RADIUS_INTERIM_INTELVAL;
    }

    public String getRADIUS_MAX_SESSION_TIMEOUT() {
        return RADIUS_MAX_SESSION_TIMEOUT;
    }

    public void setRADIUS_MAX_SESSION_TIMEOUT(String RADIUS_MAX_SESSION_TIMEOUT) {
        this.RADIUS_MAX_SESSION_TIMEOUT = RADIUS_MAX_SESSION_TIMEOUT;
    }

    public String getRADIUS_TICKET_HISTORY_DAYS() {
        return RADIUS_TICKET_HISTORY_DAYS;
    }

    public void setRADIUS_TICKET_HISTORY_DAYS(String RADIUS_TICKET_HISTORY_DAYS) {
        this.RADIUS_TICKET_HISTORY_DAYS = RADIUS_TICKET_HISTORY_DAYS;
    }

    public String getRADIUS_IGNORE_PASSWORD() {
        return RADIUS_IGNORE_PASSWORD;
    }

    public void setRADIUS_IGNORE_PASSWORD(String RADIUS_IGNORE_PASSWORD) {
        this.RADIUS_IGNORE_PASSWORD = RADIUS_IGNORE_PASSWORD;
    }

    public String getRADIUS_EXPORE_ADDR_POOL() {
        return RADIUS_EXPORE_ADDR_POOL;
    }

    public void setRADIUS_EXPORE_ADDR_POOL(String RADIUS_EXPORE_ADDR_POOL) {
        this.RADIUS_EXPORE_ADDR_POOL = RADIUS_EXPORE_ADDR_POOL;
    }

    public String getRADIUS_ONLINE_EXPIRE_CHECK() {
        return RADIUS_ONLINE_EXPIRE_CHECK;
    }

    public void setRADIUS_ONLINE_EXPIRE_CHECK(String RADIUS_ONLINE_EXPIRE_CHECK) {
        this.RADIUS_ONLINE_EXPIRE_CHECK = RADIUS_ONLINE_EXPIRE_CHECK;
    }
}
