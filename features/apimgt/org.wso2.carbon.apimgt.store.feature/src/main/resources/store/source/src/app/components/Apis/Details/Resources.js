/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Api from '../../../data/api';



function RenderMethodBase(props) {
  const { theme, method } = props;
  let chipColor = theme.custom.resourceChipColors ? theme.custom.resourceChipColors[method] : null;
    let chipTextColor = '#000000';
    if (!chipColor) {
        console.log('Check the theme settings. The resourceChipColors is not populated properlly');
        chipColor = '#cccccc';
    } else {
        chipTextColor = theme.palette.getContrastText(theme.custom.resourceChipColors[method]);
    }
  return (
    <Chip label={method} 
        style={{ backgroundColor: chipColor, color: chipTextColor, height: 20 }}  />
  );
}

RenderMethodBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const RenderMethod = withTheme()(RenderMethodBase);

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    heading: {
        marginRight: 20,
    }
});

class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paths: null,
            swagger: {},
        };
        this.api = new Api();
    }
    
    componentDidMount() {
        const api = new Api();
        this.api_uuid = this.props.api.id;

        const promised_api = this.api.getSwaggerByAPIId(this.api_uuid);
        promised_api
            .then((response) => {
                if (response.obj.paths !== undefined) {
                    this.setState({ paths: response.obj.paths });
                }
            })
            .catch((error) => {
                if (process.env.NODE_ENV !== 'production') console.log(error);
                const status = error.status;
                if (status === 404) {
                    this.setState({ notFound: true });
                } else if (status === 401) {
                    this.setState({ isAuthorize: false });
                    const params = qs.stringify({ reference: this.props.location.pathname });
                    this.props.history.push({ pathname: '/login', search: params });
                }
            });
    }
   
    render() {
        const { paths } = this.state;
        if (this.state.notFound) {
            return <div>resource not found...</div>;
        }
        if (!paths) {
            return <div>loading...</div>;
        }
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                
                <div className={classes.contentWrapper}>
                    {Object.keys(paths).map((key) => {
                        const path = paths[key];
                        return <div className={classes.root}>
                                    <Typography className={classes.heading} variant='body1'>{key}</Typography>
                                    {Object.keys(path).map((innerKey) => {
                                        return  <RenderMethod method={innerKey} />
                                    })}
                                </div>
                    })}
                    
                </div>
            </div>
        );
    }
}
Resources.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Resources);
