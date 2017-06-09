/*
 *  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.carbon.apimgt.core.auth.dto;


import com.google.gson.annotations.SerializedName;

/**
 * Model of OAuth2 Introspection Response.
 */
public class OAuth2IntrospectionResponse {

    @SerializedName("active")
    private boolean active;
    @SerializedName("client_id")
    private String clientId;
    @SerializedName("username")
    private String username;
    @SerializedName("scope")
    private String scope;
    @SerializedName("sub")
    private String sub;
    @SerializedName("aud")
    private String aud;
    @SerializedName("iss")
    private String iss;
    @SerializedName("exp")
    private long exp;
    @SerializedName("iat")
    private long iat;

    public boolean isActive() {
        return active;
    }

    public String getClientId() {
        return clientId;
    }

    public String getUsername() {
        return username;
    }

    public String getScope() {
        return scope;
    }

    public String getSub() {
        return sub;
    }

    public String getAud() {
        return aud;
    }

    public String getIss() {
        return iss;
    }

    public long getExp() {
        return exp;
    }

    public long getIat() {
        return iat;
    }
}
