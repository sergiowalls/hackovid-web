import React, {useEffect, useState} from "react";

import http from "../../services/http";
import urls from "../../helpers/urls";
import {useStoreon} from "storeon/react";
import {State} from "../../../store/state/State";
import {Events} from "../../../store/event/Events";
import {Success} from "../../helpers/Try";
import {Alert} from "../../../model/Alert";
import {ClassSection} from "../../../model/ClassSection";
import {EditableClassSection} from "../EditableClassSection/EditableClassSection";
import {ClassViewType} from "../../../model/Class";

interface SectionResponse {
    id: number,
    title: string,
    description: string

}

const MySavedSections = () =>{
    const [ sections , setSections ] = useState<ClassSection[]>([])

    const { dispatch, auth } = useStoreon<State,Events>('auth')

    useEffect(() => {
        const getMySectionSaved = async () => {
            const responseTry = await http.get<SectionResponse[]>(urls.savedSections.get(), auth)

            if (responseTry instanceof Success) {
                const response = responseTry as Success<SectionResponse[]>
                const newSections = response.value.map((sectionResponse) => (new ClassSection(
                    sectionResponse.id,sectionResponse.title, sectionResponse.description


                )))
                setSections(newSections)
            } else {
                dispatch('alert/showAlert', new Alert('Hi ha hagut un error al carregar les seccions guardades. Torna a provar en uns instants.', 'error'))
            }
        }
        getMySectionSaved()
    })

    return (
        <div>
            {sections.map(section => <EditableClassSection
                section={section}
                onChange={() => {}}
                viewType={ClassViewType.Viewable}
            />)}
        </div>
    )
}

export { MySavedSections }


