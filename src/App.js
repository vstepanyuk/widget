import { gql, useQuery } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { snakeCase } from 'lodash'

import { useScript } from './lib/hooks'

const SUBSRIPTIONS_QUERY = gql`
query {
  items: websitePlans {
    _id
    name
    description
    price {
      value
      currency_code
    }
    
    paypalId
    paypalProductId
    status
    
    frequency {
      interval_count
      interval_unit
    }

    website {
      paypalClientId
      paypalClientSecret
      paypalSandbox
    }
  }

  settings: websiteSettings {
    clientId: paypalClientId
  }
}
`

function App({ meta }) {
  const { data, loading, error } = useQuery(SUBSRIPTIONS_QUERY)

  const clientId = data?.settings?.clientId
  const status = useScript(clientId ? `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&vault=true&intent=subscription` : null)

  if (error) {
    return (
      <div className="subscriptions-error">
        {error}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="subscriptions-loading">Loading...</div>
    )
  }

  let PayPalButton = null
  if (status === 'ready') {
    PayPalButton = window.paypal.Buttons.driver("react", {
      React,
      ReactDOM,
    });
  }

  return (
    <div className="subscriptions container">
      <div className="row">
      {(data?.items ?? []).map((item, index) => (
        <div className={`d-flex align-items-stretch col-sm subscription subscription-${index} subscription-${snakeCase(item.name)}`} key={item._id}>
          <div className="card">
            <h5 className="card-header">{item.name}</h5>
            <div className="card-body" dangerouslySetInnerHTML={{ __html: item.description }} />
            {status === 'ready' && (
              <div className="paypal-buttons">
                <div className="text-center">
                  <PayPalButton
                    createSubscription={(data, actions) => {
                      return actions.subscription.create({ 
                        plan_id: item.paypalId,
                        custom_id: JSON.stringify({
                          ...meta,
                          sid: item._id
                        })
                      })
                    }}
                    style ={{
                      color: 'blue',
                      shape: 'pill',
                      height: 30,
                    }}
                    onApprove={(data, actions) => {
                      return actions.subscription.get().then(function(details) {
                        alert("Subscription completed");
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
