import React from 'react'
import {Card} from '@blueprintjs/core'

import {Page} from '../../lib/molecules/Page/Page'
import {SafePageView} from '../../lib/molecules/SafePageView/SafePageView'
import {Container} from '../../lib/atoms/Container/Container'
import {useStoreon} from "storeon/react";
import {State} from "../../store/state/State";
import {Events} from "../../store/event/Events";

const ProfilePage = () => {

    const {auth} = useStoreon<State, Events>('auth')

    let user = auth.user!!;
    return (
        <Page>
            <SafePageView>
                <Container>
                    <Card>
                        <h2>Perfil</h2>
                        <div><span>Nom:</span> <span>{user.name}</span></div>
                        <div><span>Correu electrònic:</span> <span>{user.username}</span></div>
                        <div><span>Institució:</span> <span>{user.institution}</span></div>
                    </Card>
                </Container>
            </SafePageView>
        </Page>
    )
}

export {ProfilePage}
