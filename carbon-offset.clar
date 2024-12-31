(define-fungible-token carbon-offset-token 1000000)

(define-data-var total-retired uint 0)

(define-public (mint-carbon-offset (amount uint))
  (begin
    (asserts! (is-eq (tx-sender) 'SP000000000000000000002Q6VF78) "Unauthorized minting")
    (ft-mint? carbon-offset-token amount tx-sender)
  )
)

(define-public (transfer-carbon-offset (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq (ft-balance carbon-offset-token tx-sender) amount) "Insufficient balance")
    (ft-transfer? carbon-offset-token amount tx-sender recipient)
  )
)

(define-public (retire-carbon-offset (amount uint))
  (begin
    (asserts! (>= (ft-balance carbon-offset-token tx-sender) amount) "Insufficient balance to retire")
    (ft-burn? carbon-offset-token amount tx-sender)
    (ok (var-set total-retired (+ (var-get total-retired) amount)))
  )
)

(define-read-only (get-total-retired)
  (ok (var-get total-retired))
)

(define-read-only (get-balance (account principal))
  (ok (ft-balance carbon-offset-token account))
)
