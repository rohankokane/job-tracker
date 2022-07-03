import useLocalStorageState from 'hooks/useLocalStorage'
import { createContext } from 'react'
import { Action } from 'types'
import { StateType } from 'types'

const initialState: StateType = {
  saved: [
    {
      jobTitle: 'Example',
      company: 'Drag me',
      location: 'India',
      link: '',
      description: '',
      salary: '',
      id: 'dfbaf48f-d',
      logoUrl: '',
      companyData: { name: 'Drag me', logo: '', domain: '' },
      notes: '<p>you can click here to open <strong>text editor</strong></p>',
      lastUpdated: 1656868426705,
      status: 'saved',
    },
    {
      jobTitle: 'Frontend Engineer',
      company: 'Razorpay',
      location: 'Bangalore',
      link: 'https://razorpay.com/jobs, ',
      description:
        'Desired Skills and Experience:\nA minimum of 1+ years of relevant experience\nProficient knowledge of any popular JS framework like React, Ember, Angular or Backbone\nExperience with common frontend tools like SASS/Stylus, Jade, Grunt/Gulp etc\nGood understanding of REST API\nAbility to build a feature from scratch & drive it to completion\nA willingness to learn new technology, whatever lets you deliver the best product\n\nApart from these, we also expect the following, but we accept that you can be an absolutely great developer without fulfilling the below. So go ahead and apply even if the following aren’t applicable:\nHave a few weekend side-projects up on GitHub\nHave contributed to an open source project\nHave worked at a product company\nHave working knowledge of a backend programming language',
      salary: '',
      id: 'ffaffc07-e',
      logoUrl: 'https://logo.clearbit.com/razorpay.com',
      companyData: {
        name: 'Razorpay',
        domain: 'razorpay.com',
        logo: 'https://logo.clearbit.com/razorpay.com',
      },
      notes: '<p>Focus on core javascript skills</p>',
      lastUpdated: 1656867925334,
      status: 'saved',
    },
    {
      jobTitle: 'Frontend Engineer',
      company: 'Amazon',
      location: 'Hyderabad',
      link: 'https://account.amazon.jobs/en-US, https://amazon.jobs/en/jobs/2033709/front-end-engineer, ',
      description:
        'PREFERRED QUALIFICATIONS\n\n· Experience using modern JavaScript tooling like React, Angular and Redux,\n· Genuinely excited about technology, have a strong interest in learning about and playing with the latest technologies and building compelling web applications and UI\n· Self-directed, demonstrate leadership potential and a team player\n· Proficiency in testing front-end applications and automated browser testing\n· Experience with AWS technologies like Lambda, EC2, S3, Kibana and others',
      salary: '',
      id: '8c8ceb89-7',
      logoUrl: 'https://logo.clearbit.com/amazon.com',
      companyData: {
        name: 'Amazon',
        domain: 'amazon.com',
        logo: 'https://logo.clearbit.com/amazon.com',
      },
      notes: '',
      lastUpdated: 1656868140618,
      status: 'saved',
    },
  ],
  applied: [],
  interview: [],
  offer: [],
  rejected: [],
}

type DispatchType = React.Dispatch<Action>

export const BoardContext = createContext<StateType>(initialState)
export const DispatchContext = createContext<DispatchType>(
  null as unknown as DispatchType
)

export default function BoardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useLocalStorageState(initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <BoardContext.Provider value={state}>{children}</BoardContext.Provider>
    </DispatchContext.Provider>
  )
}
