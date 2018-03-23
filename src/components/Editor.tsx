import * as React from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { SettingItem } from './SettingItem';

export enum SettingType {
    string,
    number,
    boolean,
    object
}

export interface Setting {
    name: string;
    description: string;
    type: string;
    default?: any; // any
    enum?: string[];
    enumDescriptions?: string[];
}

export interface SettingsGroup {
    name: string;
    settings: Setting[];
}

export interface Props {
    settings: Setting[];
    classes?: any;
}

const styles = (theme: any) => ({
    root: {
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

function Editor(props: Props) {
    const { classes, settings } = props;

    const config = parseSettings(settings);

    return (
        <List className={classes.root} subheader={<li />}>
            {config.map(group => (
                <li key={`section-${group.name}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader disableSticky={true}>{group.name}</ListSubheader>
                        {group.settings.map(s => (
                            <ListItem key={`item-${group.name}-${s.name}`}>
                                <ListItemText primary={s.name} secondary={s.description} />
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
}

export default withStyles(styles as any)(Editor);

// helpers

function parseSettings(settings: Setting[]): SettingsGroup[] {
    const result: SettingsGroup[] = [];

    let currentGroup: SettingsGroup;
    settings
        .filter(s => !s.name.startsWith('['))
        .forEach(s => {
            const settingGroupName = s.name.split('.')[0];
            if (!currentGroup || currentGroup.name !== settingGroupName) {
                currentGroup = {
                    name: settingGroupName,
                    settings: []
                };

                result.push(currentGroup);
            }

            currentGroup.settings.push(s);
        });

    return result;
}
