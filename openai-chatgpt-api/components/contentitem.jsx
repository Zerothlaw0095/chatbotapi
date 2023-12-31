import PropTypes from 'prop-types';
import React from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import useAppStore from '../stores/appStore';
import { CharacterIcon } from './charactericon';
import CustomTheme from './customtheme';

import classes from './contentitem.module.css';

const SelectedSystemAvatar = ({ 
    icon = 0, 
    color = '#1affb2'
}) => {
    return (
        <Avatar sx={{ backgroundColor: 'transparent', width: 24, height: 24  }}>
            <CharacterIcon icon={icon} color={color} />
        </Avatar>
    )
    
}

export default function ContentItem({ 
    role = '', 
    content = '', 
    name = '',
    icon = '',
    onDelete = undefined,
}) {

    const leftRef = React.useRef()
    const rightRef = React.useRef()

    const isDarkMode = useAppStore((state) => state.darkMode)

    const handleSelect = () => {
        if(role === 'user') {

            rightRef.current.focus()

            window.getSelection()
                .selectAllChildren(rightRef.current)
            
            

        } else {

            leftRef.current.focus()

            window.getSelection()
                .selectAllChildren(leftRef.current)
        }
    }

    return (
        <div className={classes.container} 
        style={{
            justifyContent: role === 'user' ? 'flex-end' : 'flex-start'
        }}>
            {
                role !== 'user' &&
                <>
                    <div className={classes.panelLeft}>
                        <div className={classes.logoLeft}>
                            <SelectedSystemAvatar color={isDarkMode ? '#1affb2' : '#00bd7e' } icon={icon} />
                        </div>
                        <div className={classes.name}>
                            <span>{ name }</span>
                        </div>
                    </div>
                    <div onClick={handleSelect} className={classes.contentLeft}>
                        <p ref={leftRef}>
                        {
                            content
                        }
                        </p>
                        <div className={classes.delete}>
                            <IconButton size="small" onClick={onDelete}>
                                <ClearIcon sx={{ width: 14, height: 14 }} />
                            </IconButton>
                        </div>
                    </div>
                </>
            }
            {
                role === 'user' &&
                <>
                    <div onClick={handleSelect} className={classes.contentRight}>
                        <p ref={rightRef}>
                        {
                            content
                        }
                        </p>
                        <div className={classes.delete}>
                            <IconButton size="small" onClick={onDelete}>
                                <ClearIcon sx={{ width: 14, height: 14 }} />
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.logoRight}>
                        <CustomTheme>
                            <Avatar sx={{ width: 24, height: 24  }}>
                                <PersonIcon style={{
                                    color: '#fff'
                                }} />
                            </Avatar>
                        </CustomTheme>
                    </div>
                </>
            }
        </div>
    )
}

ContentItem.propTypes = {
    
    name: PropTypes.string,
    
    icon: PropTypes.number,
    
    role: PropTypes.string,
    
    content: PropTypes.string,
    
    onDelete: PropTypes.func,
}